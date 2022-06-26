class Recipe < ApplicationRecord
  has_one_attached :image
  include Rails.application.routes.url_helpers

  # has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :user_favorites, through: :favorites, source: :user

  belongs_to :user

  # belongs_to :category

  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 50 }
  validates :ingredient, presence: true
  validates :duration, presence: true
  validates :cost, presence: true

  def self.search(keyword)
    Recipe.where(["title like? OR body like?", "%#{keyword}%", "%#{keyword}%"])
  end

  def image_url
    image.attached? ? url_for(image) : nil
  end
end
