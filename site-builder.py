"""WORK IN PROGRESS 2023 ..."""

from pathlib import Path
import argparse
import itertools
import datetime as dt
import time
import shutil

from jinja2 import Environment, FileSystemLoader, select_autoescape
from bs4 import BeautifulSoup

BUILD_DIR = Path.cwd() / "built-website"
BUILD_DIR.mkdir(exist_ok=True, parents=True, mode=0o777)
SRC_DIR =  Path.cwd() / "src"

env = Environment(
    loader=FileSystemLoader(["src/writing", "src/templates"]),
    autoescape=select_autoescape,
    line_statement_prefix="#",
)


class File:
    def __init__(self, path):
        self.path = Path(path)
        self.exists = self.path.exists()
        self.status = None
        if self.exists:
            self.last_modified = self.path.stat().st_mtime

    def check(self):
        """Return CREATED, DELETED, UPDATED, None based on file status"""
        did_exist = self.exists
        did_not_exist = not did_exist

        does_exist = self.path.exists()
        does_not_exist = not does_exist
        new_status = None

        # EXISTS -> NOT EXISTS = deleted
        if did_exist and does_not_exist:
            new_status = "DELETED"

        # DID NOT EXIST -> EXISTS = created
        if did_not_exist and does_exist:
            new_status = "CREATED"

        # LAST_MODIFIED CHANGED = updated
        elif does_exist:
            if self.path.stat().st_mtime != self.last_modified:
                new_status = "UPDATED"

        # update state for next check
        self.exists = self.path.exists()
        self.status = new_status
        if does_exist:
            self.last_modified = self.path.stat().st_mtime

        return new_status


class WatchDog:
    """Watch for file changes; on change; rebuild entire website"""

    def __init__(self, src_path, poll_frequency=2):
        self.src_path = Path(src_path)
        self.src_files = [File(f) for f in self.src_path.rglob("*") if f.is_file()]
        self.check_ever_n_seconds = poll_frequency

    def for_each_change(self, f, event_type, jinja_env):
        print(f"----> {f.as_posix()} {event_type}")

    def post_change_hook(self, src_files, jinja_env):
        # build index.html
        index_dest = BUILD_DIR / "index.html"
        index_kwargs = dict(title="About", activePage="about", route_prefix="./")
        html = render_template("about.html", index_kwargs, jinja_env)
        index_dest.write_text(str(html), encoding='utf-8')

        # load posts
        pretty_date_format = "%b %d, %Y"
        posts = {}
        writing_dir = SRC_DIR / "writing"
        (BUILD_DIR / "writing").mkdir(exist_ok=True, parents=True)

        for f in writing_dir.iterdir():
            if f.is_file() and not f.name.startswith("--ignore--"):
                post_kwargs = dict(activePage="", route_prefix="../")
                html = render_template(f.name, post_kwargs, jinja_env)

                post_date = dt.datetime.fromisoformat(html.time.text.strip())
                pretty_date = post_date.strftime(pretty_date_format)
                html.time.string.replace_with(pretty_date)

                clean_name = f.name.replace("_", "-").replace(" ", "-")
                if posts.get(clean_name):
                    raise Exception(f"Route must be unique: {clean_name}")

                # write the file
                (BUILD_DIR / "writing" / clean_name).write_text(str(html), encoding="utf-8")

                posts[clean_name] = {
                    "title": html.h1.text.strip(),
                    "date": pretty_date,
                    "path": f"./{clean_name}",
                }

        all_posts = list(sorted(posts.values(), key=lambda p: (p["date"], p["title"]), reverse=True))
        writing_summary_builder(all_posts, "index.html", "../", year=None, jinja_env=jinja_env)

        def key_(p):
            return dt.datetime.strptime(p["date"].strip(), pretty_date_format).year

        for year, group in itertools.groupby(all_posts, key=key_):
            writing_summary_builder(list(group), f"by-year-{year}.html", "../", year, jinja_env)

        # copy css
        for file_ in (SRC_DIR / "styles").iterdir():
            if file_.is_file():
                css = file_.read_text()
                (BUILD_DIR / file_.name).write_text(css, encoding="utf-8")

    def pre_change_hook(self, src_files, jinja_env):
        clear_dir(BUILD_DIR)

    def _find_new_src_files(self):
        if self.src_path.is_dir():
            prev_files = {f.path.as_posix() for f in self.src_files}
            current_files = {f.as_posix() for f in self.src_path.rglob("*") if f.is_file()}
            new_files = [File(_path) for _path in (current_files - prev_files)]
            self.src_files.extend(new_files)

    def look(self):
        self._find_new_src_files()

        for f in self.src_files:
            f.check()

        any_file_changed = any(f.status for f in self.src_files)
        if any_file_changed:
            start = time.time()
            # run pre change hook
            self.pre_change_hook(self.src_files, jinja_env=env)

            # run for_each_change hook
            for f in self.src_files:
                if f.status is not None:
                    self.for_each_change(f.path, f.status, jinja_env=env)

            # run post change hook
            self.post_change_hook(self.src_files, jinja_env=env)

            duration = dt.timedelta(seconds=time.time() - start)
            print(f"✅  Build finished. Total build time = {duration}")

    def start(self):
        while True:
            try:
                self.look()
            except (KeyboardInterrupt, SystemExit):
                print("Keyboard interupt recognized...stopping")
                break

            time.sleep(self.check_ever_n_seconds)


def writing_summary_builder(posts, filename, route_prefix, year, jinja_env):
    """Build writing (posts) summary page"""
    if year is None:
        header_title = "All Posts"
    else:
        header_title = f"{year} Posts"
    page_kwargs = dict(
        title="Writing", activePage="writing", posts=posts, route_prefix=route_prefix, header_title=header_title
    )
    html = render_template("writing-base.html", page_kwargs, jinja_env)
    (BUILD_DIR / "writing" / filename).write_text(str(html), encoding="utf-8")


def render_template(template, template_kwargs, jinja_env):
    template = jinja_env.get_template(template)

    html = template.render(**template_kwargs)
    html = BeautifulSoup(html, "html.parser")
    return html


def clear_dir(folder):
    folder = Path(folder)
    for f in folder.iterdir():
        try:
            if f.is_file():
                f.unlink()
            elif f.is_dir():
                shutil.rmtree(f.as_posix())
        except Exception as e:
            raise


if __name__ == "__main__":
    # create index.html for root of website
    parser = argparse.ArgumentParser()
    parser.add_argument("--build-only", action="store_true")
    args = parser.parse_args()

    spy = WatchDog(src_path="src")

    if args.build_only:
        print("building website once")
        spy.pre_change_hook(spy.src_files, env)
        spy.post_change_hook(spy.src_files, env)
        print("site done building")
    else:
        print("Starting site watch dog...")
        spy.start()
