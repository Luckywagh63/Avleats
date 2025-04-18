'use client';

import { useEffect, useState } from 'react';

export default function ProductDetails({ barcode }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!barcode) {
      setError('Barcode missing');
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        if (data.status === 0) {
          throw new Error('Product not found');
        }

        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return null;

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">{product.product_name || 'Unknown Product'}</h2>
      {product.image_front_url && (
        <img src={product.image_front_url} alt={product.product_name} className="w-48 h-auto mb-4" />
      )}
      <p><strong>Description:</strong> {product.generic_name || 'No description available'}</p>
      <p><strong>Ingredients:</strong> {product.ingredients_text || 'Not listed'}</p>
      <p><strong>Allergens:</strong> {product.allergens_tags?.join(', ').replace(/en:/g, '') || 'None'}</p>
    </div>
  );
}
