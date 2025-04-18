import { NextResponse } from "next/server";
import { foodAlternatives } from "../../../lib/data";

export async function GET(req) {
  const barcode = req.nextUrl.searchParams.get("barcode");

  if (!barcode) {
    return NextResponse.json({ error: "Barcode is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
    const data = await response.json();

    if (!data || !data.product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = data.product;

    const formatted = {
      name: product.product_name || "Unknown Product",
      description: product.generic_name || "No description available",
      image: product.image_front_url || "",
      barcode: product.code,
      ingredients: product.ingredients_text
        ? product.ingredients_text.split(",").map((i) => i.trim())
        : [],
      harmful_ingredients: product.additives_tags
        ? product.additives_tags.map((tag) => tag.replace("en:", "").toUpperCase())
        : [],
      allergens: product.allergens_tags
        ? product.allergens_tags.map((a) => a.replace("en:", ""))
        : [],
      nutrition: product.nutriments
        ? {
            energy: product.nutriments["energy-kcal_100g"],
            fat: product.nutriments.fat_100g,
            sugar: product.nutriments.sugars_100g,
            salt: product.nutriments.salt_100g,
            carbohydrates: product.nutriments.carbohydrates_100g,
            proteins: product.nutriments.proteins_100g,
          }
        : null,
      categories: product.categories_tags
        ? product.categories_tags.map((c) => c.replace("en:", ""))
        : [],
      alternatives: foodAlternatives[barcode] || [],
    };

    return NextResponse.json(formatted);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
