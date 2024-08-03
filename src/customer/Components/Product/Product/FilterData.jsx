export const color = [
  "white",
  "Black",
  "Red",
  "marun",
  "Being",
  "Pink",
  "Green",
  "Yellow",
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
    { "value": "white", "label": "White" },
    { "value": "black", "label": "Black" },
    { "value": "gray", "label": "Gray" },
    { "value": "red", "label": "Red" },
    { "value": "pink", "label": "Pink" },
    { "value": "orange", "label": "Orange" },
    { "value": "yellow", "label": "Yellow" },
    { "value": "green", "label": "Green" },
    { "value": "blue", "label": "Blue" },
    { "value": "purple", "label": "Purple" },
    { "value": "brown", "label": "Brown" },
    { "value": "gold", "label": "Gold" },
    { "value": "silver", "label": "Silver" },
    { "value": "maroon", "label": "Maroon" },

  ]
  },

  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
  
];

export const singleFilter=[
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-500", label: "Up to ₹500" },
      { value: "500-1000", label: "₹500 To ₹1000" },
      { value: "1000-2500", label: "₹1000 To ₹2500" },
      { value: "2500-5000", label: "₹2500 To ₹5000" },
      { value: "5000-10000", label: "₹5000 To ₹10000" },
      { value: "10000-20000", label: "₹10000 To ₹20000" },
      { value: "20000-50000", label: "₹20000 To ₹50000" },
      { value: "50000+", label: "Above ₹50000" }
    ]
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      {
        value: "5",
        label: "5% And Above",
      },
      {
        value: "10",
        label: "10% And Above",
      },
      { value: "20", label: "20% And Above" },
      { value: "30", label: "30% And Above" },
      { value: "40", label: "40% And Above" },
      { value: "50", label: "50% And Above" },
      { value: "60", label: "60% And Above" },
      { value: "70", label: "70% And Above" },
      { value: "80", label: "80% And Above" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out Of Stock" },
      
    ],
  },
]

export const sortOptions = [
  
  { name: "Price: Low to High", query: "price_low", current: false },
  { name: "Price: High to Low", query: "price_high", current: false },
];
