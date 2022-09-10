require 'rails_helper'

RSpec.describe 'home/index.html.erb', type: :view do
  it 'Home should be in the document"' do
    render

    expect(rendered).to match /id="home"/
  end
end
