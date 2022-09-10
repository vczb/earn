FLASH_TYPE_TO_COLOR = { error: 'bg-red-500', success: 'bg-emerald-400' }

RSpec.shared_examples 'a page with flash message with' do |options|
  type = options.fetch(:type)
  message = options.fetch(:message)

  it "expect to render a #{type} flash with #{message}" do
    expect(page).to have_css(
      ".flash-banner.#{FLASH_TYPE_TO_COLOR[type]}",
      text: message
    )
  end
end
