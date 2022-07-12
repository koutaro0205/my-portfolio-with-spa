FactoryBot.define do
  factory :question do
    title {"質問タイトル"}
    content {"質問内容"}
    association :user

    trait :with_question_comments do
      after(:create) { |question| create_list(:question_comment, 5, question: question) }
    end
  end

  factory :other_question, class: Question do
    title {"質問タイトル2"}
    content {"質問内容2"}
    association :user
  end

  factory :continuous_questions, class: Question do
    sequence(:title) { |n| "質問タイトル #{n}" }
    sequence(:content) { |n| "質問内容 #{n}" }
    association :user
  end
end
