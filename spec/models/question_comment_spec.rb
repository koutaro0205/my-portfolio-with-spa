require 'rails_helper'

RSpec.describe QuestionComment, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:question) { FactoryBot.create(:question, user_id: user.id) }
  let(:question_comment){FactoryBot.build(:question_comment)}

  it 'is valid' do
    question_comment = FactoryBot.create(:question_comment, user_id: user.id, question_id: question.id)
    expect(question_comment).to be_valid
  end

  it 'is invalid without a user_id' do
    question_comment.user_id = nil
    expect(question_comment).to_not be_valid
  end

  it 'is invalid without a question_id' do
    question_comment.question_id = nil
    expect(question_comment).to_not be_valid
  end

  it 'is invalid without a content' do
    question_comment.content = nil
    expect(question_comment).to_not be_valid
  end
end
