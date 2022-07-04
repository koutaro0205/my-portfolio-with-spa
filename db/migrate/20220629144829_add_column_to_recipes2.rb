class AddColumnToRecipes2 < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :category_id, :integer
  end
end
