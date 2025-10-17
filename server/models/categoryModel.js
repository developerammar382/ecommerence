import { query } from '../config/database.js';

export const categoryModel = {
  async findAll() {
    const result = await query(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    return result.rows;
  },

  async findById(id) {
    const result = await query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async findBySlug(slug) {
    const result = await query(
      'SELECT * FROM categories WHERE slug = $1',
      [slug]
    );
    return result.rows[0];
  },

  async create(categoryData) {
    const { name, slug, description, icon } = categoryData;
    const result = await query(
      'INSERT INTO categories (name, slug, description, icon) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, slug, description, icon]
    );
    return result.rows[0];
  },

  async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) return null;

    values.push(id);

    const result = await query(
      `UPDATE categories SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  },

  async delete(id) {
    await query('DELETE FROM categories WHERE id = $1', [id]);
  }
};
