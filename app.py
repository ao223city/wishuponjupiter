from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3
from pathlib import Path

app = Flask(__name__)
app.secret_key = "wish-upon-jupiter-local-key"

DATABASE = Path(__file__).resolve().parent / "testimonials.db"


def get_db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    with get_db() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS testimonials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT DEFAULT '',
                name TEXT DEFAULT '',
                rating INTEGER NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)


init_db()


@app.route("/")
def home():
    """Show the existing Wish Upon Jupiter home page."""
    return render_template("index.html")


@app.route("/testimonials")
def testimonials():
    """Show every submitted testimonial."""
    with get_db() as db:
        entries = db.execute("""
            SELECT * FROM testimonials
            ORDER BY id DESC
        """).fetchall()

    return render_template(
        "testimonials.html",
        testimonials=entries
    )


@app.route("/write-testimonial", methods=["GET", "POST"])
def write_testimonial():
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        name = request.form.get("name", "").strip()
        message = request.form.get("message", "").strip()

        try:
            rating = int(request.form.get("rating", "0"))
        except ValueError:
            rating = 0

        if not 1 <= rating <= 5:
            flash("Please select a rating from 1 to 5 stars.")
            return redirect(url_for("write_testimonial"))

        if not message:
            flash("Please write your testimonial before submitting.")
            return redirect(url_for("write_testimonial"))

        if len(title) > 100 or len(name) > 60 or len(message) > 2000:
            flash("Please shorten your title, name, or message.")
            return redirect(url_for("write_testimonial"))

        with get_db() as db:
            db.execute("""
                INSERT INTO testimonials (title, name, rating, message)
                VALUES (?, ?, ?, ?)
            """, (title, name, rating, message))

        flash("Thank you! Your testimonial has been added. ✨")
        return redirect(url_for("testimonials"))

    return render_template("write_testimonial.html")


if __name__ == "__main__":
    app.run(debug=True)