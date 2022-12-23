class HomeController < ApplicationController
  def index
    render :json => {ok: true},  status: :ok
  end
end
