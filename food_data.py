# Comprehensive food nutrition database
# All values are per standard serving

FOODS = [
    # ===== FRUITS =====
    {"name": "Apple", "calories": 95, "protein": 0.5, "carbs": 25, "fat": 0.3, "fiber": 4.4, "serving": "1 medium (182g)", "category": "Fruit", "emoji": "🍎"},
    {"name": "Banana", "calories": 105, "protein": 1.3, "carbs": 27, "fat": 0.4, "fiber": 3.1, "serving": "1 medium (118g)", "category": "Fruit", "emoji": "🍌"},
    {"name": "Orange", "calories": 62, "protein": 1.2, "carbs": 15, "fat": 0.2, "fiber": 3.1, "serving": "1 medium (131g)", "category": "Fruit", "emoji": "🍊"},
    {"name": "Strawberries", "calories": 49, "protein": 1.0, "carbs": 12, "fat": 0.5, "fiber": 3.0, "serving": "1 cup (152g)", "category": "Fruit", "emoji": "🍓"},
    {"name": "Grapes", "calories": 104, "protein": 1.1, "carbs": 27, "fat": 0.2, "fiber": 1.4, "serving": "1 cup (151g)", "category": "Fruit", "emoji": "🍇"},
    {"name": "Watermelon", "calories": 46, "protein": 0.9, "carbs": 12, "fat": 0.2, "fiber": 0.6, "serving": "1 cup (152g)", "category": "Fruit", "emoji": "🍉"},
    {"name": "Mango", "calories": 99, "protein": 1.4, "carbs": 25, "fat": 0.6, "fiber": 2.6, "serving": "1 cup (165g)", "category": "Fruit", "emoji": "🥭"},
    {"name": "Pineapple", "calories": 82, "protein": 0.9, "carbs": 22, "fat": 0.2, "fiber": 2.3, "serving": "1 cup (165g)", "category": "Fruit", "emoji": "🍍"},
    {"name": "Blueberries", "calories": 84, "protein": 1.1, "carbs": 21, "fat": 0.5, "fiber": 3.6, "serving": "1 cup (148g)", "category": "Fruit", "emoji": "🫐"},
    {"name": "Avocado", "calories": 240, "protein": 3.0, "carbs": 13, "fat": 22, "fiber": 10, "serving": "1 medium (150g)", "category": "Fruit", "emoji": "🥑"},
    {"name": "Papaya", "calories": 55, "protein": 0.9, "carbs": 14, "fat": 0.1, "fiber": 2.5, "serving": "1 cup (140g)", "category": "Fruit", "emoji": "🍈"},
    {"name": "Pomegranate", "calories": 83, "protein": 1.7, "carbs": 19, "fat": 1.2, "fiber": 4.0, "serving": "1/2 fruit (87g)", "category": "Fruit", "emoji": "🍎"},
    {"name": "Guava", "calories": 37, "protein": 1.4, "carbs": 8, "fat": 0.5, "fiber": 3.0, "serving": "1 fruit (55g)", "category": "Fruit", "emoji": "🍈"},

    # ===== VEGETABLES =====
    {"name": "Broccoli", "calories": 55, "protein": 3.7, "carbs": 11, "fat": 0.6, "fiber": 5.1, "serving": "1 cup (156g)", "category": "Vegetable", "emoji": "🥦"},
    {"name": "Carrot", "calories": 25, "protein": 0.6, "carbs": 6, "fat": 0.1, "fiber": 1.7, "serving": "1 medium (61g)", "category": "Vegetable", "emoji": "🥕"},
    {"name": "Spinach", "calories": 7, "protein": 0.9, "carbs": 1, "fat": 0.1, "fiber": 0.7, "serving": "1 cup raw (30g)", "category": "Vegetable", "emoji": "🥬"},
    {"name": "Tomato", "calories": 22, "protein": 1.1, "carbs": 5, "fat": 0.2, "fiber": 1.5, "serving": "1 medium (123g)", "category": "Vegetable", "emoji": "🍅"},
    {"name": "Cucumber", "calories": 16, "protein": 0.7, "carbs": 4, "fat": 0.1, "fiber": 0.5, "serving": "1 cup (104g)", "category": "Vegetable", "emoji": "🥒"},
    {"name": "Potato", "calories": 161, "protein": 4.3, "carbs": 37, "fat": 0.2, "fiber": 3.8, "serving": "1 medium (213g)", "category": "Vegetable", "emoji": "🥔"},
    {"name": "Sweet Potato", "calories": 103, "protein": 2.3, "carbs": 24, "fat": 0.1, "fiber": 3.8, "serving": "1 medium (130g)", "category": "Vegetable", "emoji": "🍠"},
    {"name": "Onion", "calories": 44, "protein": 1.2, "carbs": 10, "fat": 0.1, "fiber": 1.9, "serving": "1 medium (110g)", "category": "Vegetable", "emoji": "🧅"},
    {"name": "Bell Pepper", "calories": 31, "protein": 1.0, "carbs": 7, "fat": 0.3, "fiber": 2.5, "serving": "1 medium (119g)", "category": "Vegetable", "emoji": "🫑"},
    {"name": "Mushroom", "calories": 15, "protein": 2.2, "carbs": 2, "fat": 0.2, "fiber": 0.7, "serving": "1 cup (70g)", "category": "Vegetable", "emoji": "🍄"},
    {"name": "Cauliflower", "calories": 27, "protein": 2.1, "carbs": 5, "fat": 0.3, "fiber": 2.1, "serving": "1 cup (107g)", "category": "Vegetable", "emoji": "🥬"},
    {"name": "Cabbage", "calories": 22, "protein": 1.1, "carbs": 5, "fat": 0.1, "fiber": 2.2, "serving": "1 cup (89g)", "category": "Vegetable", "emoji": "🥬"},

    # ===== GRAINS & CEREALS =====
    {"name": "White Rice", "calories": 206, "protein": 4.3, "carbs": 45, "fat": 0.4, "fiber": 0.6, "serving": "1 cup cooked (186g)", "category": "Grain", "emoji": "🍚"},
    {"name": "Brown Rice", "calories": 216, "protein": 5.0, "carbs": 45, "fat": 1.8, "fiber": 3.5, "serving": "1 cup cooked (195g)", "category": "Grain", "emoji": "🍚"},
    {"name": "Oatmeal", "calories": 154, "protein": 5.3, "carbs": 27, "fat": 2.6, "fiber": 4.0, "serving": "1 cup cooked (234g)", "category": "Grain", "emoji": "🥣"},
    {"name": "Whole Wheat Bread", "calories": 69, "protein": 3.6, "carbs": 12, "fat": 1.1, "fiber": 1.9, "serving": "1 slice (28g)", "category": "Grain", "emoji": "🍞"},
    {"name": "White Bread", "calories": 79, "protein": 2.7, "carbs": 15, "fat": 1.0, "fiber": 0.6, "serving": "1 slice (30g)", "category": "Grain", "emoji": "🍞"},
    {"name": "Pasta", "calories": 220, "protein": 8.1, "carbs": 43, "fat": 1.3, "fiber": 2.5, "serving": "1 cup cooked (140g)", "category": "Grain", "emoji": "🍝"},
    {"name": "Quinoa", "calories": 222, "protein": 8.1, "carbs": 39, "fat": 3.5, "fiber": 5.2, "serving": "1 cup cooked (185g)", "category": "Grain", "emoji": "🌾"},
    {"name": "Cornflakes", "calories": 101, "protein": 1.9, "carbs": 24, "fat": 0.2, "fiber": 0.7, "serving": "1 cup (28g)", "category": "Grain", "emoji": "🥣"},
    {"name": "Roti / Chapati", "calories": 104, "protein": 3.1, "carbs": 18, "fat": 3.0, "fiber": 2.0, "serving": "1 piece (40g)", "category": "Grain", "emoji": "🫓"},
    {"name": "Naan Bread", "calories": 262, "protein": 8.7, "carbs": 45, "fat": 5.1, "fiber": 2.0, "serving": "1 piece (90g)", "category": "Grain", "emoji": "🫓"},
    {"name": "Paratha", "calories": 180, "protein": 4.0, "carbs": 24, "fat": 7.5, "fiber": 1.5, "serving": "1 piece (60g)", "category": "Grain", "emoji": "🫓"},

    # ===== PROTEIN =====
    {"name": "Chicken Breast", "calories": 165, "protein": 31, "carbs": 0, "fat": 3.6, "fiber": 0, "serving": "100g cooked", "category": "Protein", "emoji": "🍗"},
    {"name": "Chicken Thigh", "calories": 209, "protein": 26, "carbs": 0, "fat": 10.9, "fiber": 0, "serving": "100g cooked", "category": "Protein", "emoji": "🍗"},
    {"name": "Egg", "calories": 78, "protein": 6.3, "carbs": 0.6, "fat": 5.3, "fiber": 0, "serving": "1 large (50g)", "category": "Protein", "emoji": "🥚"},
    {"name": "Boiled Egg", "calories": 78, "protein": 6.3, "carbs": 0.6, "fat": 5.3, "fiber": 0, "serving": "1 large (50g)", "category": "Protein", "emoji": "🥚"},
    {"name": "Salmon", "calories": 208, "protein": 20, "carbs": 0, "fat": 13, "fiber": 0, "serving": "100g cooked", "category": "Protein", "emoji": "🐟"},
    {"name": "Tuna", "calories": 132, "protein": 28, "carbs": 0, "fat": 1.3, "fiber": 0, "serving": "100g cooked", "category": "Protein", "emoji": "🐟"},
    {"name": "Shrimp", "calories": 99, "protein": 24, "carbs": 0.2, "fat": 0.3, "fiber": 0, "serving": "100g cooked", "category": "Protein", "emoji": "🦐"},
    {"name": "Beef Steak", "calories": 271, "protein": 26, "carbs": 0, "fat": 18, "fiber": 0, "serving": "100g cooked", "category": "Protein", "emoji": "🥩"},
    {"name": "Ground Beef", "calories": 254, "protein": 17, "carbs": 0, "fat": 20, "fiber": 0, "serving": "100g cooked", "category": "Protein", "emoji": "🥩"},
    {"name": "Turkey Breast", "calories": 135, "protein": 30, "carbs": 0, "fat": 1.0, "fiber": 0, "serving": "100g cooked", "category": "Protein", "emoji": "🦃"},
    {"name": "Paneer", "calories": 265, "protein": 18, "carbs": 1.2, "fat": 21, "fiber": 0, "serving": "100g", "category": "Protein", "emoji": "🧀"},
    {"name": "Tofu", "calories": 76, "protein": 8, "carbs": 1.9, "fat": 4.8, "fiber": 0.3, "serving": "100g", "category": "Protein", "emoji": "🧊"},
    {"name": "Dal (Lentils)", "calories": 198, "protein": 14, "carbs": 34, "fat": 0.8, "fiber": 11, "serving": "1 cup cooked (198g)", "category": "Protein", "emoji": "🥘"},
    {"name": "Chickpeas", "calories": 269, "protein": 15, "carbs": 45, "fat": 4.2, "fiber": 12.5, "serving": "1 cup cooked (164g)", "category": "Protein", "emoji": "🥜"},
    {"name": "Kidney Beans", "calories": 225, "protein": 15, "carbs": 40, "fat": 0.9, "fiber": 13.1, "serving": "1 cup cooked (177g)", "category": "Protein", "emoji": "🫘"},

    # ===== DAIRY =====
    {"name": "Whole Milk", "calories": 149, "protein": 8, "carbs": 12, "fat": 8, "fiber": 0, "serving": "1 cup (244ml)", "category": "Dairy", "emoji": "🥛"},
    {"name": "Skim Milk", "calories": 83, "protein": 8.3, "carbs": 12, "fat": 0.2, "fiber": 0, "serving": "1 cup (245ml)", "category": "Dairy", "emoji": "🥛"},
    {"name": "Yogurt (Plain)", "calories": 100, "protein": 17, "carbs": 6, "fat": 0.7, "fiber": 0, "serving": "1 cup (245g)", "category": "Dairy", "emoji": "🥛"},
    {"name": "Greek Yogurt", "calories": 100, "protein": 17, "carbs": 6, "fat": 0.7, "fiber": 0, "serving": "1 cup (170g)", "category": "Dairy", "emoji": "🥛"},
    {"name": "Cheddar Cheese", "calories": 113, "protein": 7, "carbs": 0.4, "fat": 9.3, "fiber": 0, "serving": "1 slice (28g)", "category": "Dairy", "emoji": "🧀"},
    {"name": "Mozzarella Cheese", "calories": 85, "protein": 6.3, "carbs": 0.7, "fat": 6.3, "fiber": 0, "serving": "1 slice (28g)", "category": "Dairy", "emoji": "🧀"},
    {"name": "Butter", "calories": 102, "protein": 0.1, "carbs": 0, "fat": 11.5, "fiber": 0, "serving": "1 tbsp (14g)", "category": "Dairy", "emoji": "🧈"},
    {"name": "Cottage Cheese", "calories": 206, "protein": 28, "carbs": 6, "fat": 9, "fiber": 0, "serving": "1 cup (226g)", "category": "Dairy", "emoji": "🧀"},

    # ===== FAST FOOD & MEALS =====
    {"name": "Pizza Slice", "calories": 285, "protein": 12, "carbs": 36, "fat": 10, "fiber": 2.5, "serving": "1 slice (107g)", "category": "Fast Food", "emoji": "🍕"},
    {"name": "Burger", "calories": 354, "protein": 20, "carbs": 29, "fat": 17, "fiber": 1.3, "serving": "1 burger (170g)", "category": "Fast Food", "emoji": "🍔"},
    {"name": "French Fries", "calories": 365, "protein": 4, "carbs": 48, "fat": 17, "fiber": 4.4, "serving": "1 medium (117g)", "category": "Fast Food", "emoji": "🍟"},
    {"name": "Hot Dog", "calories": 290, "protein": 11, "carbs": 24, "fat": 17, "fiber": 0.8, "serving": "1 hot dog (98g)", "category": "Fast Food", "emoji": "🌭"},
    {"name": "Fried Chicken", "calories": 320, "protein": 23, "carbs": 12, "fat": 21, "fiber": 0.5, "serving": "1 piece (130g)", "category": "Fast Food", "emoji": "🍗"},
    {"name": "Biryani", "calories": 290, "protein": 12, "carbs": 38, "fat": 10, "fiber": 1.5, "serving": "1 cup (200g)", "category": "Fast Food", "emoji": "🍛"},
    {"name": "Butter Chicken", "calories": 240, "protein": 18, "carbs": 8, "fat": 15, "fiber": 1.0, "serving": "1 cup (200g)", "category": "Fast Food", "emoji": "🍛"},
    {"name": "Samosa", "calories": 262, "protein": 5, "carbs": 28, "fat": 15, "fiber": 2.0, "serving": "1 piece (100g)", "category": "Fast Food", "emoji": "🥟"},
    {"name": "Dosa", "calories": 168, "protein": 4, "carbs": 28, "fat": 5, "fiber": 1.5, "serving": "1 piece (100g)", "category": "Fast Food", "emoji": "🫓"},
    {"name": "Idli", "calories": 39, "protein": 2, "carbs": 8, "fat": 0.2, "fiber": 0.5, "serving": "1 piece (30g)", "category": "Fast Food", "emoji": "🫓"},
    {"name": "Poha", "calories": 180, "protein": 3.5, "carbs": 32, "fat": 5, "fiber": 1.0, "serving": "1 plate (150g)", "category": "Fast Food", "emoji": "🍚"},
    {"name": "Maggi Noodles", "calories": 205, "protein": 4.6, "carbs": 27, "fat": 8.5, "fiber": 1.0, "serving": "1 pack (70g)", "category": "Fast Food", "emoji": "🍜"},
    {"name": "Sandwich", "calories": 252, "protein": 11, "carbs": 30, "fat": 10, "fiber": 2.0, "serving": "1 sandwich", "category": "Fast Food", "emoji": "🥪"},
    {"name": "Wrap / Burrito", "calories": 350, "protein": 15, "carbs": 42, "fat": 13, "fiber": 3.0, "serving": "1 wrap (200g)", "category": "Fast Food", "emoji": "🌯"},
    {"name": "Sushi Roll", "calories": 200, "protein": 9, "carbs": 28, "fat": 5, "fiber": 1.0, "serving": "6 pieces (150g)", "category": "Fast Food", "emoji": "🍣"},
    {"name": "Tacos", "calories": 226, "protein": 9, "carbs": 20, "fat": 12, "fiber": 2.0, "serving": "1 taco (113g)", "category": "Fast Food", "emoji": "🌮"},

    # ===== SNACKS =====
    {"name": "Almonds", "calories": 164, "protein": 6, "carbs": 6, "fat": 14, "fiber": 3.5, "serving": "1 oz (28g)", "category": "Snack", "emoji": "🥜"},
    {"name": "Peanuts", "calories": 161, "protein": 7.3, "carbs": 4.6, "fat": 14, "fiber": 2.4, "serving": "1 oz (28g)", "category": "Snack", "emoji": "🥜"},
    {"name": "Cashews", "calories": 157, "protein": 5.2, "carbs": 8.6, "fat": 12.4, "fiber": 0.9, "serving": "1 oz (28g)", "category": "Snack", "emoji": "🥜"},
    {"name": "Dark Chocolate", "calories": 170, "protein": 2.2, "carbs": 13, "fat": 12, "fiber": 3.1, "serving": "1 oz (28g)", "category": "Snack", "emoji": "🍫"},
    {"name": "Milk Chocolate", "calories": 153, "protein": 2.1, "carbs": 17, "fat": 8.7, "fiber": 0.6, "serving": "1 oz (28g)", "category": "Snack", "emoji": "🍫"},
    {"name": "Chips / Crisps", "calories": 152, "protein": 2, "carbs": 15, "fat": 10, "fiber": 1.4, "serving": "1 oz (28g)", "category": "Snack", "emoji": "🥔"},
    {"name": "Popcorn", "calories": 93, "protein": 3, "carbs": 19, "fat": 1.1, "fiber": 3.5, "serving": "3 cups (24g)", "category": "Snack", "emoji": "🍿"},
    {"name": "Granola Bar", "calories": 193, "protein": 4, "carbs": 29, "fat": 7, "fiber": 2.0, "serving": "1 bar (42g)", "category": "Snack", "emoji": "🍫"},
    {"name": "Biscuit / Cookie", "calories": 68, "protein": 0.8, "carbs": 9, "fat": 3.3, "fiber": 0.3, "serving": "1 piece (15g)", "category": "Snack", "emoji": "🍪"},
    {"name": "Ice Cream", "calories": 207, "protein": 3.5, "carbs": 24, "fat": 11, "fiber": 0.5, "serving": "1/2 cup (66g)", "category": "Snack", "emoji": "🍦"},
    {"name": "Cake Slice", "calories": 352, "protein": 4.5, "carbs": 51, "fat": 14, "fiber": 0.5, "serving": "1 slice (80g)", "category": "Snack", "emoji": "🍰"},
    {"name": "Donut", "calories": 289, "protein": 5, "carbs": 33, "fat": 16, "fiber": 0.7, "serving": "1 donut (75g)", "category": "Snack", "emoji": "🍩"},

    # ===== BEVERAGES =====
    {"name": "Black Coffee", "calories": 2, "protein": 0.3, "carbs": 0, "fat": 0, "fiber": 0, "serving": "1 cup (237ml)", "category": "Beverage", "emoji": "☕"},
    {"name": "Coffee with Milk", "calories": 67, "protein": 3.4, "carbs": 5, "fat": 3.8, "fiber": 0, "serving": "1 cup (237ml)", "category": "Beverage", "emoji": "☕"},
    {"name": "Cappuccino", "calories": 120, "protein": 6, "carbs": 10, "fat": 6, "fiber": 0, "serving": "1 cup (240ml)", "category": "Beverage", "emoji": "☕"},
    {"name": "Tea (No Sugar)", "calories": 2, "protein": 0, "carbs": 0.7, "fat": 0, "fiber": 0, "serving": "1 cup (237ml)", "category": "Beverage", "emoji": "🍵"},
    {"name": "Chai (with Milk & Sugar)", "calories": 100, "protein": 3, "carbs": 15, "fat": 3, "fiber": 0, "serving": "1 cup (200ml)", "category": "Beverage", "emoji": "🍵"},
    {"name": "Green Tea", "calories": 2, "protein": 0.5, "carbs": 0, "fat": 0, "fiber": 0, "serving": "1 cup (237ml)", "category": "Beverage", "emoji": "🍵"},
    {"name": "Orange Juice", "calories": 112, "protein": 1.7, "carbs": 26, "fat": 0.5, "fiber": 0.5, "serving": "1 cup (248ml)", "category": "Beverage", "emoji": "🧃"},
    {"name": "Coca-Cola", "calories": 140, "protein": 0, "carbs": 39, "fat": 0, "fiber": 0, "serving": "1 can (355ml)", "category": "Beverage", "emoji": "🥤"},
    {"name": "Lemonade", "calories": 99, "protein": 0.2, "carbs": 26, "fat": 0.1, "fiber": 0.2, "serving": "1 cup (240ml)", "category": "Beverage", "emoji": "🍋"},
    {"name": "Lassi", "calories": 170, "protein": 5, "carbs": 24, "fat": 6, "fiber": 0, "serving": "1 glass (250ml)", "category": "Beverage", "emoji": "🥛"},
    {"name": "Coconut Water", "calories": 46, "protein": 1.7, "carbs": 9, "fat": 0.5, "fiber": 2.6, "serving": "1 cup (240ml)", "category": "Beverage", "emoji": "🥥"},
    {"name": "Protein Shake", "calories": 160, "protein": 25, "carbs": 8, "fat": 3, "fiber": 1.0, "serving": "1 scoop + water (300ml)", "category": "Beverage", "emoji": "🥤"},
    {"name": "Smoothie (Fruit)", "calories": 180, "protein": 3, "carbs": 40, "fat": 0.5, "fiber": 3.0, "serving": "1 cup (250ml)", "category": "Beverage", "emoji": "🥤"},

    # ===== CONDIMENTS & EXTRAS =====
    {"name": "Honey", "calories": 64, "protein": 0.1, "carbs": 17, "fat": 0, "fiber": 0, "serving": "1 tbsp (21g)", "category": "Extra", "emoji": "🍯"},
    {"name": "Peanut Butter", "calories": 94, "protein": 4, "carbs": 3, "fat": 8, "fiber": 1.0, "serving": "1 tbsp (16g)", "category": "Extra", "emoji": "🥜"},
    {"name": "Olive Oil", "calories": 119, "protein": 0, "carbs": 0, "fat": 14, "fiber": 0, "serving": "1 tbsp (14ml)", "category": "Extra", "emoji": "🫒"},
    {"name": "Ketchup", "calories": 19, "protein": 0.2, "carbs": 5, "fat": 0, "fiber": 0.1, "serving": "1 tbsp (17g)", "category": "Extra", "emoji": "🍅"},
    {"name": "Mayonnaise", "calories": 94, "protein": 0.1, "carbs": 0.1, "fat": 10, "fiber": 0, "serving": "1 tbsp (14g)", "category": "Extra", "emoji": "🥄"},
    {"name": "Ghee", "calories": 112, "protein": 0, "carbs": 0, "fat": 12.7, "fiber": 0, "serving": "1 tbsp (14g)", "category": "Extra", "emoji": "🧈"},
    {"name": "Sugar", "calories": 49, "protein": 0, "carbs": 13, "fat": 0, "fiber": 0, "serving": "1 tbsp (13g)", "category": "Extra", "emoji": "🍬"},
    {"name": "White Rice (Basmati)", "calories": 210, "protein": 4.4, "carbs": 46, "fat": 0.5, "fiber": 0.6, "serving": "1 cup cooked (186g)", "category": "Grain", "emoji": "🍚"},
]


def search_foods(query):
    """Search foods by name (case-insensitive partial match)."""
    query = query.lower().strip()
    if not query:
        return []

    results = []
    for food in FOODS:
        name_lower = food["name"].lower()
        # Exact match gets highest priority
        if name_lower == query:
            results.insert(0, food)
        # Starts with query
        elif name_lower.startswith(query):
            results.insert(min(len(results), 3), food)
        # Contains query
        elif query in name_lower:
            results.append(food)

    return results[:15]


def get_all_categories():
    """Get all unique food categories."""
    categories = set()
    for food in FOODS:
        categories.add(food["category"])
    return sorted(list(categories))


def get_foods_by_category(category):
    """Get all foods in a specific category."""
    return [f for f in FOODS if f["category"].lower() == category.lower()]
