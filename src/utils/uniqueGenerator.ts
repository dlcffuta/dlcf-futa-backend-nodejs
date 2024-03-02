export const uniqueGenerator = () => { 
    const SKU = String(Math.floor(Math.pow(10, 6) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 5) - 1)));
    return SKU;
}

