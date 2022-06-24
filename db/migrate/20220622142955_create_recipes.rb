class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :ingredient
      t.text :body
      t.integer :duration
      t.integer :cost
      t.integer :category_id
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :recipes, [:user_id, :created_at]
  end
end
