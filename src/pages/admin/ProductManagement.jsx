// src/pages/admin/ProductManagement.jsx
import { useState } from 'react';


// ✅ Tambahkan import ini (Penyebab error kedua)
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminNavbar } from '@/components/admin/layout/AdminNavbar';

// Context & Services
import { useProducts } from '@/context/ProductContext';

// Components
import { ProductTable } from '@/components/admin/product/ProductTable';
import { ProductModal } from '@/components/admin/product/ProductModal';
import { ConfirmDialog } from '@/components/admin/common/ConfirmDialog';
import { Button } from '@/Components/ui/Button';
import { Plus, RefreshCw } from 'lucide-react';

export const ProductManagement = () => {
  const {
    products,
    loading,
    refreshProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddNew = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      setIsSubmitting(true);
      setError('');
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStock = async (id, qty) => {
    try {
      setError('');
      await updateProduct(id, { stock: Math.max(0, qty) });
    } catch (err) {
      console.error('Error updating stock:', err);
      setError('Failed to update stock');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
      
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Product Management</h1>
            <p className="text-slate-500 mt-2">Create, update, and manage your inventory</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-slate-600">
              Total {products.length} products
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={refreshProducts}
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleAddNew}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading products...</div>
          ) : (
            <ProductTable 
              products={products}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onUpdateStock={handleUpdateStock}
              onAddNew={handleAddNew}
            />
          )}
        </main>
      </div>

      <ProductModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      <ConfirmDialog 
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};
export default ProductManagement;