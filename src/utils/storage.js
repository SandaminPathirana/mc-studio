// LocalStorage Keys
const INVENTORY_KEY = 'mc_inventory';
const ORDERS_KEY = 'mc_orders';
const CUSTOMERS_KEY = 'mc_customers';
const TRANSACTIONS_KEY = 'mc_transactions';

// Default Data Sets
const defaultInventory = [
  { id: 'INV-001', name: 'Sony A7 IV Camera Body', category: 'Equipment', quantity: 3, price: 850000 },
  { id: 'INV-002', name: 'Sony 24-70mm f/2.8 GM II Lens', category: 'Equipment', quantity: 2, price: 650000 },
  { id: 'INV-003', name: 'Flush Mount Album Sheets (12x18)', category: 'Printing Paper', quantity: 15, price: 450 },
  { id: 'INV-004', name: 'Wooden Photo Frame (16x24)', category: 'Frames', quantity: 4, price: 3500 },
  { id: 'INV-005', name: 'Godox AD600 Pro Strobe Light', category: 'Equipment', quantity: 4, price: 280000 },
  { id: 'INV-006', name: 'Premium Leather Album Cover', category: 'Albums', quantity: 25, price: 8500 }
];

const defaultOrders = [
  { id: 'ORD-1001', customer: 'Kasun Kalhara', service: 'Wedding Photography', amount: 250000, status: 'Pending', date: '2026-09-01' },
  { id: 'ORD-1002', customer: 'Nimali Perera', service: 'Preshoot Album', amount: 85000, status: 'Completed', date: '2026-08-28' }
];

const defaultCustomers = [
  { id: 'CUST-001', name: 'Kasun Kalhara', phone: '0771234567', email: 'kasun@gmail.com', orders: 2 },
  { id: 'CUST-002', name: 'Nimali Perera', phone: '0719876543', email: 'nimali@gmail.com', orders: 1 }
];

// --- 1. INVENTORY & STOCK MANAGEMENT ---
export const getInventory = () => {
  try {
    const data = localStorage.getItem(INVENTORY_KEY);
    if (!data) {
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(defaultInventory));
      return defaultInventory;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading inventory:", error);
    return defaultInventory;
  }
};

export const saveInventory = (data) => {
  try {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving inventory:", error);
  }
};

export const addInventoryItem = (newItem) => {
  const current = getInventory();
  const updated = [newItem, ...current];
  saveInventory(updated);
  return updated;
};

export const updateStockQuantity = (itemId, changeQty, type = 'add') => {
  const current = getInventory();
  const updated = current.map(item => {
    if (item.id === itemId) {
      const currentQty = Number(item.quantity || 0);
      const newQty = type === 'add' ? currentQty + Number(changeQty) : Math.max(0, currentQty - Number(changeQty));
      return { ...item, quantity: newQty };
    }
    return item;
  });
  saveInventory(updated);
  return updated;
};

export const deleteInventoryItem = (itemId) => {
  const current = getInventory();
  const updated = current.filter(item => item.id !== itemId);
  saveInventory(updated);
  return updated;
};

// All Inventory/Stock Aliases for Safety
export const getStock = getInventory;
export const getStockItems = getInventory;
export const saveStock = saveInventory;
export const saveStockItem = addInventoryItem;
export const addStockItem = addInventoryItem;
export const updateStock = updateStockQuantity;
export const updateStockItem = updateStockQuantity;
export const deleteStockItem = deleteInventoryItem;

// --- 2. ORDERS MANAGEMENT ---
export const getOrders = () => {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    if (!data) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(defaultOrders));
      return defaultOrders;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading orders:", error);
    return defaultOrders;
  }
};

export const saveOrders = (data) => {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving orders:", error);
  }
};

export const saveOrder = (newOrder) => {
  const currentOrders = getOrders();
  const updatedOrders = [newOrder, ...currentOrders];
  saveOrders(updatedOrders);
  return updatedOrders;
};

export const updateOrderStatus = (orderId, newStatus) => {
  const currentOrders = getOrders();
  const updatedOrders = currentOrders.map((order) =>
    order.id === orderId ? { ...order, status: newStatus } : order
  );
  saveOrders(updatedOrders);
  return updatedOrders;
};

export const deleteOrder = (orderId) => {
  const currentOrders = getOrders();
  const updatedOrders = currentOrders.filter((order) => order.id !== orderId);
  saveOrders(updatedOrders);
  return updatedOrders;
};

// Order Aliases
export const addOrder = saveOrder;
export const createOrder = saveOrder;

// --- 3. CUSTOMERS MANAGEMENT ---
export const getCustomers = () => {
  try {
    const data = localStorage.getItem(CUSTOMERS_KEY);
    if (!data) {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(defaultCustomers));
      return defaultCustomers;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading customers:", error);
    return defaultCustomers;
  }
};

export const saveCustomers = (data) => {
  try {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving customers:", error);
  }
};

export const saveCustomer = (newCustomer) => {
  const current = getCustomers();
  const updated = [newCustomer, ...current];
  saveCustomers(updated);
  return updated;
};

export const addCustomer = saveCustomer;

// --- 4. TRANSACTIONS & LOGS MANAGEMENT ---
export const getTransactions = () => {
  try {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading transactions:", error);
    return [];
  }
};

export const addTransaction = (transaction) => {
  const current = getTransactions();
  const updated = [transaction, ...current];
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving transaction:", error);
  }
  return updated;
};

export const saveTransaction = addTransaction;
export const getLogs = getTransactions;