export function useProductActions(baseUrl) {

  const createProduct = async (payload) => {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.json();
  };

  const updateProduct = async (id, payload) => {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.json();
  };

  const deleteProduct = async (id) => {
    await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
  };

  return { createProduct, updateProduct, deleteProduct };
}
