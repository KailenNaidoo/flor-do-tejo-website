// ===== Product Catalog =====
const PRODUCTS = [
    // Seafood
    { id: 1, name: 'Hake Fillets', category: 'seafood', price: 89.99, unit: 'per kg', emoji: '&#x1F41F;', description: 'Fresh ocean-caught hake fillets' },
    { id: 2, name: 'Prawns 8/12', category: 'seafood', price: 299.99, unit: 'per kg', emoji: '&#x1F990;', description: 'Premium large prawns, 8-12 count' },
    { id: 3, name: 'Prawns 13/15', category: 'seafood', price: 269.99, unit: 'per kg', emoji: '&#x1F990;', description: 'Quality prawns, 13-15 count' },
    { id: 4, name: 'Prawns 16/20', category: 'seafood', price: 239.99, unit: 'per kg', emoji: '&#x1F990;', description: 'Medium prawns, 16-20 count' },
    { id: 5, name: 'Prawns 26/30', category: 'seafood', price: 199.99, unit: 'per kg', emoji: '&#x1F990;', description: 'Cocktail prawns, 26-30 count' },
    { id: 6, name: 'Prawn Meat 20/40', category: 'seafood', price: 219.99, unit: 'per kg', emoji: '&#x1F990;', description: 'Peeled prawn meat, 20-40 size' },
    { id: 7, name: 'Prawn Meat 40/60', category: 'seafood', price: 189.99, unit: 'per kg', emoji: '&#x1F990;', description: 'Peeled prawn meat, 40-60 size' },
    { id: 8, name: 'Prawn Meat 60/80', category: 'seafood', price: 159.99, unit: 'per kg', emoji: '&#x1F990;', description: 'Peeled prawn meat, 60-80 size' },
    { id: 9, name: 'Prawns Crumbed Butterfly', category: 'seafood', price: 249.99, unit: 'per kg', emoji: '&#x1F990;', description: 'Crumbed butterfly prawns, ready to fry' },
    { id: 10, name: 'Calamari Tubes', category: 'seafood', price: 149.99, unit: 'per kg', emoji: '&#x1F991;', description: 'Cleaned calamari tubes' },
    { id: 11, name: 'Mussels', category: 'seafood', price: 79.99, unit: 'per kg', emoji: '&#x1F41A;', description: 'Fresh black mussels' },
    { id: 12, name: 'Crab', category: 'seafood', price: 189.99, unit: 'per kg', emoji: '&#x1F980;', description: 'Whole crab, ocean fresh' },
    { id: 13, name: 'Salmon Fillets', category: 'seafood', price: 259.99, unit: 'per kg', emoji: '&#x1F420;', description: 'Premium salmon fillets' },
    { id: 14, name: 'Yellowtail', category: 'seafood', price: 179.99, unit: 'per kg', emoji: '&#x1F41F;', description: 'Fresh yellowtail portions' },

    // Poultry
    { id: 15, name: 'Fresh Chicken Portions', category: 'poultry', price: 69.99, unit: 'per kg', emoji: '&#x1F357;', description: 'Mixed chicken portions, fresh' },
    { id: 16, name: 'Chicken Breast Fillets', category: 'poultry', price: 99.99, unit: 'per kg', emoji: '&#x1F357;', description: 'Boneless chicken breast' },
    { id: 17, name: 'Chicken Drumsticks', category: 'poultry', price: 59.99, unit: 'per kg', emoji: '&#x1F357;', description: 'Fresh chicken drumsticks' },
    { id: 18, name: 'Chicken Wings', category: 'poultry', price: 64.99, unit: 'per kg', emoji: '&#x1F357;', description: 'Chicken wings, bulk pack' },
    { id: 19, name: 'Frozen Chicken IQF', category: 'poultry', price: 54.99, unit: 'per kg', emoji: '&#x1F414;', description: 'Individually quick frozen portions' },
    { id: 20, name: 'Whole Frozen Chicken', category: 'poultry', price: 74.99, unit: 'each', emoji: '&#x1F414;', description: 'Whole frozen chicken, 1.5kg avg' },

    // Dry Goods
    { id: 21, name: 'Basmati Rice 10kg', category: 'dry-goods', price: 189.99, unit: 'per bag', emoji: '&#x1F35A;', description: 'Premium basmati rice, 10kg bag' },
    { id: 22, name: 'Parboiled Rice 10kg', category: 'dry-goods', price: 149.99, unit: 'per bag', emoji: '&#x1F35A;', description: 'Parboiled rice, 10kg bag' },
    { id: 23, name: 'Mixed Spice Blend', category: 'dry-goods', price: 45.99, unit: 'per 500g', emoji: '&#x1F9C2;', description: 'House blend spice mix' },
    { id: 24, name: 'Paprika', category: 'dry-goods', price: 39.99, unit: 'per 500g', emoji: '&#x1F9C2;', description: 'Smoked paprika, premium grade' },
    { id: 25, name: 'Sunflower Oil 5L', category: 'dry-goods', price: 109.99, unit: 'per bottle', emoji: '&#x1FAD2;', description: 'Sunflower cooking oil, 5 litre' },
    { id: 26, name: 'Canola Oil 5L', category: 'dry-goods', price: 119.99, unit: 'per bottle', emoji: '&#x1FAD2;', description: 'Canola oil, 5 litre' },
    { id: 27, name: 'Olive Oil 1L', category: 'dry-goods', price: 149.99, unit: 'per bottle', emoji: '&#x1FAD2;', description: 'Extra virgin olive oil' },

    // Frozen
    { id: 28, name: 'Straight Cut Chips 2.5kg', category: 'frozen', price: 69.99, unit: 'per bag', emoji: '&#x1F35F;', description: 'Classic straight cut frozen chips' },
    { id: 29, name: 'Crinkle Cut Chips 2.5kg', category: 'frozen', price: 74.99, unit: 'per bag', emoji: '&#x1F35F;', description: 'Crinkle cut frozen chips' },
    { id: 30, name: 'Sweet Potato Fries 1kg', category: 'frozen', price: 89.99, unit: 'per bag', emoji: '&#x1F360;', description: 'Sweet potato fries, frozen' },
    { id: 31, name: 'Curly Fries 2kg', category: 'frozen', price: 84.99, unit: 'per bag', emoji: '&#x1F300;', description: 'Seasoned curly fries' },
    { id: 32, name: 'Onion Rings 1kg', category: 'frozen', price: 64.99, unit: 'per bag', emoji: '&#x1F9C5;', description: 'Crumbed onion rings' },
    { id: 33, name: 'Mixed Vegetables 2.5kg', category: 'frozen', price: 54.99, unit: 'per bag', emoji: '&#x1F966;', description: 'Frozen mixed vegetables' },
    { id: 34, name: 'Broccoli Florets 1kg', category: 'frozen', price: 49.99, unit: 'per bag', emoji: '&#x1F966;', description: 'Frozen broccoli florets' },
    { id: 35, name: 'Crumbed Chicken Strips 1kg', category: 'frozen', price: 99.99, unit: 'per bag', emoji: '&#x1F414;', description: 'Crumbed chicken strips, ready to fry' },
];
