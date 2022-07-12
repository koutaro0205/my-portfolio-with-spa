FactoryBot.define do
  factory :interest do
    question_id { 1 }
    user_id { 1 }
    association :user
    association :question
  end

  factory :interesting_questions, class: Interest do
    question_id { 1 }
    user_id { 1 }
  end
end

def create_interests
  10.times do
    FactoryBot.create(:continuous_questions)
  end

  FactoryBot.create(:user) do |user|
    Question.all[0...-1].each do |question|
      FactoryBot.create(:interesting_questions, user_id: user.id, question_id: question.id)
    end
    user
  end
end
