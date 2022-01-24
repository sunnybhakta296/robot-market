export const formatDate = (date) => {
    return `${date.slice(8, 10)}-${date.slice(5, 7)}-${date.slice(0, 4)}`;
}

export const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(price)
}

export const validateCartItems = (clickedItem, cartItems) => {
    const uniqueRobotIds = new Set(cartItems.map((r) => r.id));
    return uniqueRobotIds.size < 5 || uniqueRobotIds.has(clickedItem.id); 
}