from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from food_data import search_foods, FOODS, get_all_categories, get_foods_by_category
import os

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    """Serve the main page."""
    return render_template("index.html")


@app.route("/sw.js")
def service_worker():
    """Serve service worker from root for proper PWA scope."""
    return send_from_directory(os.path.join(app.root_path, "static"), "sw.js",
                               mimetype="application/javascript")


@app.route("/api/search")
def api_search():
    """Search foods by name."""
    query = request.args.get("q", "").strip()
    if not query:
        return jsonify([])
    results = search_foods(query)
    return jsonify(results)


@app.route("/api/foods")
def api_foods():
    """Return all foods."""
    return jsonify(FOODS)


@app.route("/api/categories")
def api_categories():
    """Return all food categories."""
    return jsonify(get_all_categories())


@app.route("/api/foods/<category>")
def api_foods_by_category(category):
    """Return foods by category."""
    return jsonify(get_foods_by_category(category))


if __name__ == "__main__":
    print("\n🔥 Calorie Tracker is running!")
    print("📍 Open http://localhost:5000 in your browser\n")
    app.run(debug=True, port=5000)
