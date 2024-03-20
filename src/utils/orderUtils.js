export const generateOrderNumber = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `ORDER-${randomNumber}`;
};
  