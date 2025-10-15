<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Content Management</h1>
      <button class="btn-primary">+ Create Content</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="card">
        <h3 class="text-gray-600 mb-2">Homepage Banner</h3>
        <div class="bg-gray-200 h-32 rounded-lg mb-3"></div>
        <button class="btn-secondary w-full">Edit Banner</button>
      </div>
      <div class="card">
        <h3 class="text-gray-600 mb-2">Featured Products</h3>
        <div class="bg-gray-200 h-32 rounded-lg mb-3"></div>
        <button class="btn-secondary w-full">Manage Featured</button>
      </div>
      <div class="card">
        <h3 class="text-gray-600 mb-2">Promotional Content</h3>
        <div class="bg-gray-200 h-32 rounded-lg mb-3"></div>
        <button class="btn-secondary w-full">Edit Promotions</button>
      </div>
    </div>

    <div class="card">
      <h2 class="text-xl font-semibold mb-4">SEO Settings</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Meta Title</label>
          <input type="text" class="input-field" placeholder="ShopHub - Your One-Stop Shop" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Meta Description</label>
          <textarea class="input-field" rows="3" placeholder="Shop for clothing, electronics, groceries and more..."></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Meta Keywords</label>
          <input type="text" class="input-field" placeholder="ecommerce, shopping, online store" />
        </div>
        <button class="btn-primary">Save SEO Settings</button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
