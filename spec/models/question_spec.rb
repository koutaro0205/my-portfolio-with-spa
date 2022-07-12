require 'rails_helper'

RSpec.describe Question, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:question) { FactoryBot.build(:question, user_id: user.id) }

  it 'is valid' do
    expect(question).to be_valid
  end

  it 'is invalid without a user_id' do
    question.user_id = nil
    expect(question).to_not be_valid
  end

  it 'is invalid without a title' do
    question.title = nil
    expect(question).to_not be_valid
  end

  it "can have many question comments" do
    question = FactoryBot.create(:question, :with_question_comments)
    expect(question.question_comments.length).to eq 5
  end
end
