
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Button } from '@/Components/ui/Button';
import { Badge } from '@/Components/ui/badge';
import { Edit, Trash2, Package, Plus } from 'lucide-react';

export const ProductTable = ({ 
  products, 
  onEdit, 
  onDelete, 
  onUpdateStock,
  onAddNew 
}) => {
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStockBadgeColor = (stock) => {
    if (stock === 0) return 'destructive'; //(gada stok)
    if (stock <= 10) return 'outline'; //(Low Stock)
    return 'default'; //(In Stock)
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-medium text-slate-900">No products yet</h3>
        <p className="text-slate-500 mt-2">Get started by adding your first product.</p>
        <Button onClick={onAddNew} className="mt-6">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <div className="col-span-1">Image</div>
        <div className="col-span-3">Product Info</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Stock</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-100">
        {products.map((product) => (
          <div key={product.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors">
            
            {/* Image */}
            <div className="col-span-1">
              <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden border border-slate-200">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Info */}
            <div className="col-span-3">
              <div className="font-medium text-slate-900">{product.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">ID: {product.id.substring(0, 8)}...</div>
            </div>

            {/* Category */}
            <div className="col-span-2">
              <Badge variant="outline" className="capitalize">
                {product.category.replace('-', ' ')}
              </Badge>
            </div>

            {/* Price */}
            <div className="col-span-2 text-sm font-medium text-slate-700">
              {formatCurrency(product.price)}
            </div>

            {/* Stock */}
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <Badge variant={getStockBadgeColor(product.stock)}>
                  {product.stock === 0 ? 'Out of Stock' : product.stock}
                </Badge>
                {onUpdateStock && (
                  <div className="flex items-center gap-1 ml-2">
                    <button 
                      onClick={() => onUpdateStock(product.id, product.stock - 1)}
                      className="w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-xs"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => onUpdateStock(product.id, product.stock + 1)}
                      className="w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-xs"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit(product)}
                className="h-8 px-2"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onDelete(product.id)}
                className="h-8 px-2"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};