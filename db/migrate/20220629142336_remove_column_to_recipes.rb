class RemoveColumnToRecipes < ActiveRecord::Migration[7.0]
  def change
    remove_column :recipes, :category_id
  end
end
