FactoryBot.define do
  factory :question_comment do
    content {"質問コメント内容"}
    association :user
    association :question
  end
end
