require 'rails_helper'

RSpec.describe Interest, type: :model do
  let(:interest){FactoryBot.create(:interest)}
  it 'is valid' do
    expect(interest).to be_valid
  end

  it 'is invalid without a user_id' do
    interest.user_id = nil
    expect(interest).to_not be_valid
  end

  it 'is invalid without a question_id' do
    interest.question_id = nil
    expect(interest).to_not be_valid
  end

  describe '#interests' do
    let(:question) {FactoryBot.create(:question)}
    let(:other_question) {FactoryBot.create(:other_question)}
    let(:user){question.user}

    it 'removes the interests of the user if the posting user is deleted' do
      user.interested_in(other_question)
      expect {
        user.destroy
      }.to change(Question, :count).by -1
    end
  end
end
