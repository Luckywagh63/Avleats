import { FoodItem } from '../../lib/data/diet';

const unpackedFoods = [
  {
    name: 'Dal Tadka',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 180, protein: 9, carbohydrates: 24, fat: 6, fiber: 5, sugar: 3, calcium: 60, iron: 2.5, vitaminC: 2 }
  },
  {
    name: 'Chole (Chickpea Curry)',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 210, protein: 11, carbohydrates: 30, fat: 8, fiber: 7, sugar: 5, calcium: 80, iron: 3, vitaminC: 3 }
  },
  {
    name: 'Paneer Butter Masala',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 300, protein: 12, carbohydrates: 14, fat: 24, fiber: 2, sugar: 6, calcium: 200, iron: 1.5, vitaminC: 4 }
  },
  {
    name: 'Aloo Gobi',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 160, protein: 4, carbohydrates: 20, fat: 8, fiber: 5, sugar: 4, calcium: 40, iron: 1.2, vitaminC: 25 }
  },
  {
    name: 'Rajma (Kidney Bean Curry)',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 220, protein: 10, carbohydrates: 32, fat: 7, fiber: 8, sugar: 3, calcium: 70, iron: 2.8, vitaminC: 3 }
  },
  {
    name: 'Palak Paneer',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 240, protein: 13, carbohydrates: 10, fat: 18, fiber: 4, sugar: 3, calcium: 240, iron: 3, vitaminC: 20 }
  },
  {
    name: 'Baingan Bharta',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 130, protein: 3, carbohydrates: 16, fat: 6, fiber: 5, sugar: 6, calcium: 40, iron: 1.5, vitaminC: 10 }
  },
  {
    name: 'Bhindi Masala',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 110, protein: 3, carbohydrates: 14, fat: 5, fiber: 4, sugar: 3, calcium: 80, iron: 1.2, vitaminC: 15 }
  },
  {
    name: 'Kadhi Pakora',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 190, protein: 7, carbohydrates: 16, fat: 11, fiber: 2, sugar: 4, calcium: 90, iron: 1, vitaminC: 1 }
  },
  {
    name: 'Vegetable Pulao',
    category: 'Rice Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 200, protein: 5, carbohydrates: 32, fat: 6, fiber: 3, sugar: 2, calcium: 30, iron: 1, vitaminC: 5 }
  },
  {
    name: 'Jeera Rice',
    category: 'Rice Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 180, protein: 3, carbohydrates: 34, fat: 4, fiber: 1, sugar: 0, calcium: 20, iron: 0.7, vitaminC: 0 }
  },
  {
    name: 'Plain Roti (Whole Wheat)',
    category: 'Bread',
    servingSize: '1 piece',
    nutrition: { calories: 100, protein: 3, carbohydrates: 18, fat: 3, fiber: 2, sugar: 0, calcium: 10, iron: 0.9, vitaminC: 0 }
  },
  {
    name: 'Paratha (Plain)',
    category: 'Bread',
    servingSize: '1 piece',
    nutrition: { calories: 180, protein: 4, carbohydrates: 22, fat: 8, fiber: 2, sugar: 1, calcium: 20, iron: 1, vitaminC: 0 }
  },
  {
    name: 'Idli (2 pieces)',
    category: 'Breakfast',
    servingSize: '2 pieces',
    nutrition: { calories: 140, protein: 4, carbohydrates: 28, fat: 1, fiber: 1, sugar: 0, calcium: 15, iron: 0.5, vitaminC: 0 }
  },
  {
    name: 'Dosa (Plain)',
    category: 'Breakfast',
    servingSize: '1 dosa',
    nutrition: { calories: 160, protein: 3, carbohydrates: 30, fat: 4, fiber: 1, sugar: 0, calcium: 10, iron: 0.6, vitaminC: 0 }
  },
  {
    name: 'Sambar',
    category: 'Side Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 100, protein: 4, carbohydrates: 14, fat: 3, fiber: 3, sugar: 3, calcium: 35, iron: 1.1, vitaminC: 8 }
  },
  {
    name: 'Upma',
    category: 'Breakfast',
    servingSize: '1 bowl',
    nutrition: { calories: 220, protein: 6, carbohydrates: 32, fat: 8, fiber: 2, sugar: 1, calcium: 20, iron: 1.2, vitaminC: 0 }
  },
  {
    name: 'Poha',
    category: 'Breakfast',
    servingSize: '1 bowl',
    nutrition: { calories: 180, protein: 3, carbohydrates: 30, fat: 5, fiber: 2, sugar: 1, calcium: 15, iron: 1, vitaminC: 2 }
  },
  {
    name: 'Curd (Plain Yogurt)',
    category: 'Dairy',
    servingSize: '100g',
    nutrition: { calories: 60, protein: 3, carbohydrates: 5, fat: 3, fiber: 0, sugar: 5, calcium: 120, iron: 0.1, vitaminC: 0 }
  },
  {
    name: 'Boiled Egg',
    category: 'Protein',
    servingSize: '1 egg',
    nutrition: { calories: 78, protein: 6, carbohydrates: 1, fat: 5, fiber: 0, sugar: 1, calcium: 25, iron: 0.6, vitaminC: 0 }
  },
  {
    name: 'Almonds',
    category: 'Nuts & Seeds',
    servingSize: '28g (approx 23)',
    nutrition: { calories: 160, protein: 6, carbohydrates: 6, fat: 14, fiber: 3, sugar: 1, calcium: 75, iron: 1.1, vitaminC: 0 }
  },
  {
    name: 'Peanuts (Roasted)',
    category: 'Nuts & Seeds',
    servingSize: '28g',
    nutrition: { calories: 165, protein: 7, carbohydrates: 5, fat: 14, fiber: 2, sugar: 1, calcium: 30, iron: 1.3, vitaminC: 0 }
  },
  {
    name: 'Chia Seeds',
    category: 'Nuts & Seeds',
    servingSize: '100g',
    nutrition: { calories: 486, protein: 16.5, carbohydrates: 42, fat: 30, fiber: 34, sugar: 0, calcium: 631, iron: 7.7, vitaminC: 1.6 }
  },
  {
    name: 'Green Moong Sprouts',
    category: 'Salads',
    servingSize: '1 bowl',
    nutrition: { calories: 70, protein: 6, carbohydrates: 12, fat: 1, fiber: 3, sugar: 1, calcium: 25, iron: 1.5, vitaminC: 13 }
  },
  {
    name: 'Tandoori Chicken (1 leg)',
    category: 'Protein',
    servingSize: '1 piece',
    nutrition: { calories: 270, protein: 26, carbohydrates: 2, fat: 18, fiber: 0, sugar: 1, calcium: 22, iron: 1.2, vitaminC: 0 }
  },
  // Fast Food Indian and Street Food Items
  {
    name: 'Medu Vada',
    category: 'Indian Fast Food',
    servingSize: '2 pieces',
    nutrition: { calories: 180, protein: 5, carbohydrates: 24, fat: 8, fiber: 2, sugar: 1, calcium: 15, iron: 1.1, vitaminC: 0 }
  },
  {
    name: 'Samosa',
    category: 'Indian Fast Food',
    servingSize: '1 piece',
    nutrition: { calories: 220, protein: 4, carbohydrates: 26, fat: 12, fiber: 2, sugar: 2, calcium: 15, iron: 1.2, vitaminC: 3 }
  },
  {
    name: 'Pav Bhaji',
    category: 'Indian Fast Food',
    servingSize: '1 plate',
    nutrition: { calories: 320, protein: 8, carbohydrates: 45, fat: 14, fiber: 5, sugar: 6, calcium: 40, iron: 2.2, vitaminC: 15 }
  },
  {
    name: 'Vada Pav',
    category: 'Indian Fast Food',
    servingSize: '1 piece',
    nutrition: { calories: 250, protein: 6, carbohydrates: 35, fat: 10, fiber: 2, sugar: 3, calcium: 20, iron: 1.5, vitaminC: 1 }
  },
  {
    name: 'Bhel Puri',
    category: 'Indian Fast Food',
    servingSize: '1 bowl',
    nutrition: { calories: 180, protein: 5, carbohydrates: 30, fat: 5, fiber: 3, sugar: 5, calcium: 20, iron: 1.3, vitaminC: 8 }
  },
  {
    name: 'Pani Puri',
    category: 'Indian Fast Food',
    servingSize: '6 pieces',
    nutrition: { calories: 160, protein: 3, carbohydrates: 28, fat: 5, fiber: 2, sugar: 4, calcium: 15, iron: 0.8, vitaminC: 5 }
  },
  {
    name: 'Kachori',
    category: 'Indian Fast Food',
    servingSize: '1 piece',
    nutrition: { calories: 190, protein: 4, carbohydrates: 22, fat: 10, fiber: 2, sugar: 1, calcium: 15, iron: 1.0, vitaminC: 0 }
  },
  {
    name: 'Aloo Tikki',
    category: 'Indian Fast Food',
    servingSize: '2 pieces',
    nutrition: { calories: 170, protein: 3, carbohydrates: 25, fat: 7, fiber: 2, sugar: 1, calcium: 15, iron: 0.9, vitaminC: 6 }
  },
  {
    name: 'Masala Dosa',
    category: 'Breakfast',
    servingSize: '1 dosa',
    nutrition: { calories: 240, protein: 5, carbohydrates: 40, fat: 8, fiber: 3, sugar: 1, calcium: 20, iron: 1.2, vitaminC: 5 }
  },
  {
    name: 'Uttapam',
    category: 'Breakfast',
    servingSize: '1 piece',
    nutrition: { calories: 180, protein: 4, carbohydrates: 32, fat: 5, fiber: 2, sugar: 1, calcium: 25, iron: 1.0, vitaminC: 4 }
  },
  {
    name: 'Chaat (Aloo Chaat)',
    category: 'Indian Fast Food',
    servingSize: '1 plate',
    nutrition: { calories: 200, protein: 4, carbohydrates: 30, fat: 8, fiber: 3, sugar: 5, calcium: 30, iron: 1.4, vitaminC: 10 }
  },
  // Additional Indian Main Dishes
  {
    name: 'Malai Kofta',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 330, protein: 8, carbohydrates: 22, fat: 25, fiber: 3, sugar: 4, calcium: 120, iron: 1.8, vitaminC: 6 }
  },
  {
    name: 'Butter Chicken',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 320, protein: 22, carbohydrates: 10, fat: 22, fiber: 1, sugar: 5, calcium: 50, iron: 1.5, vitaminC: 3 }
  },
  {
    name: 'Chicken Tikka Masala',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 290, protein: 24, carbohydrates: 12, fat: 18, fiber: 2, sugar: 6, calcium: 60, iron: 2.0, vitaminC: 5 }
  },
  {
    name: 'Egg Curry',
    category: 'Indian Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 220, protein: 14, carbohydrates: 12, fat: 14, fiber: 2, sugar: 4, calcium: 70, iron: 2.5, vitaminC: 8 }
  },
  {
    name: 'Paneer Tikka',
    category: 'Indian Dish',
    servingSize: '6 pieces',
    nutrition: { calories: 280, protein: 16, carbohydrates: 8, fat: 22, fiber: 1, sugar: 3, calcium: 240, iron: 1.2, vitaminC: 5 }
  },
  // Additional Indian Breads
  {
    name: 'Naan',
    category: 'Bread',
    servingSize: '1 piece',
    nutrition: { calories: 170, protein: 5, carbohydrates: 30, fat: 4, fiber: 1, sugar: 2, calcium: 20, iron: 1.0, vitaminC: 0 }
  },
  {
    name: 'Aloo Paratha',
    category: 'Bread',
    servingSize: '1 piece',
    nutrition: { calories: 230, protein: 5, carbohydrates: 32, fat: 10, fiber: 3, sugar: 1, calcium: 25, iron: 1.5, vitaminC: 2 }
  },
  {
    name: 'Kulcha',
    category: 'Bread',
    servingSize: '1 piece',
    nutrition: { calories: 160, protein: 5, carbohydrates: 28, fat: 3, fiber: 1, sugar: 2, calcium: 15, iron: 0.8, vitaminC: 0 }
  },
  // Rice Dishes
  {
    name: 'Biryani (Vegetable)',
    category: 'Rice Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 320, protein: 7, carbohydrates: 52, fat: 10, fiber: 4, sugar: 3, calcium: 40, iron: 1.8, vitaminC: 6 }
  },
  {
    name: 'Chicken Biryani',
    category: 'Rice Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 380, protein: 20, carbohydrates: 48, fat: 14, fiber: 3, sugar: 2, calcium: 30, iron: 2.2, vitaminC: 5 }
  },
  {
    name: 'Lemon Rice',
    category: 'Rice Dish',
    servingSize: '1 bowl',
    nutrition: { calories: 240, protein: 4, carbohydrates: 40, fat: 8, fiber: 2, sugar: 1, calcium: 15, iron: 0.8, vitaminC: 2 }
  },
  // Sweets & Desserts
  {
    name: 'Gulab Jamun',
    category: 'Dessert',
    servingSize: '2 pieces',
    nutrition: { calories: 300, protein: 3, carbohydrates: 50, fat: 10, fiber: 0, sugar: 45, calcium: 40, iron: 0.5, vitaminC: 0 }
  },
  {
    name: 'Rasgulla',
    category: 'Dessert',
    servingSize: '2 pieces',
    nutrition: { calories: 220, protein: 5, carbohydrates: 40, fat: 5, fiber: 0, sugar: 38, calcium: 100, iron: 0.2, vitaminC: 0 }
  },
  {
    name: 'Jalebi',
    category: 'Dessert',
    servingSize: '2 pieces',
    nutrition: { calories: 230, protein: 2, carbohydrates: 45, fat: 6, fiber: 0, sugar: 42, calcium: 10, iron: 0.3, vitaminC: 0 }
  },
  // Beverages
  {
    name: 'Lassi (Sweet)',
    category: 'Beverage',
    servingSize: '1 glass',
    nutrition: { calories: 180, protein: 5, carbohydrates: 30, fat: 5, fiber: 0, sugar: 28, calcium: 150, iron: 0.2, vitaminC: 2 }
  },
  {
    name: 'Masala Chai',
    category: 'Beverage',
    servingSize: '1 cup',
    nutrition: { calories: 70, protein: 2, carbohydrates: 12, fat: 2, fiber: 0, sugar: 10, calcium: 50, iron: 0.3, vitaminC: 0 }
  },
  {
    name: 'Butter Milk (Chaas)',
    category: 'Beverage',
    servingSize: '1 glass',
    nutrition: { calories: 50, protein: 3, carbohydrates: 4, fat: 2, fiber: 0, sugar: 4, calcium: 90, iron: 0.1, vitaminC: 0 }
  }
];

export default unpackedFoods;