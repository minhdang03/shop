export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu -
    .replace(/[^\w\-]+/g, '') // Xóa ký tự không phải chữ cái, số hoặc dấu -
    .replace(/\-\-+/g, '-') // Thay thế nhiều dấu - bằng một dấu -
    .replace(/^-+/, '') // Xóa dấu - ở đầu
    .replace(/-+$/, ''); // Xóa dấu - ở cuối
}; 