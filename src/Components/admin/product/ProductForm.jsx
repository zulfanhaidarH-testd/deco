
import { useForm } from 'react-hook-form';
import { Button } from '@/Components/ui/Button';
import { Label } from '@/Components/ui/label';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/Select';

export const ProductForm = ({ initialData, onSubmit, onCancel }) => {
  // setValue untuk ubah value form dgn manual 
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: initialData || {
      name: '',
      price: '',
      stock: 0,
      category: 'living-room',
      image: 'https://picsum.photos/seed/new/400/500'
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        
        <div className="col-span-2 space-y-2">
          <Label htmlFor="name">Product Name</Label>
          
          <input
            id="name"
            type="text"
            placeholder="e.g., Sofa Minimalis"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            {...register('name', { required: 'Nama produk wajib diisi' })}
          />
          
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </div>

        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          
          <Select 
            onValueChange={(value) => setValue('category', value)} // Update form state
            defaultValue={initialData?.category || 'living-room'}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="living-room">Living Room</SelectItem>
              <SelectItem value="dining-room">Dining Room</SelectItem>
              <SelectItem value="office-room">Office Room</SelectItem>
              <SelectItem value="bedroom">Bedroom</SelectItem>
              <SelectItem value="bathroom">Bathroom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        
        <div className="space-y-2">
          <Label htmlFor="price">Price (IDR)</Label>
          
          <input
            id="price"
            type="number"
            placeholder="0"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            {...register('price', { required: 'Harga wajib diisi', min: 0 })}
          />
          
          {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
        </div>

        
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          
          <input
            id="stock"
            type="number"
            min="0"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            {...register('stock', { valueAsNumber: true })}
          />
        </div>

        {/* Image URL */}
        <div className="col-span-2 space-y-2">
          <Label htmlFor="image">Image URL</Label>
          
          <input
            id="image"
            type="url"
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            {...register('image', { required: 'URL gambar wajib diisi' })}
          />
          
          {errors.image && <span className="text-xs text-red-500">{errors.image.message}</span>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {initialData ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};