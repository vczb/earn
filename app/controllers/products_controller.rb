class ProductsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_product, only: %i[edit update destroy]

  def index
    @products = Product.where(user_id: current_user.id)
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      flash.notice = I18n.t('web.product.actions.create.success')
      redirect_to products_path
    else
      flash.alert = I18n.t('web.product.actions.create.fail')
      render 'new'
    end
  end

  def edit; end

  def update
    if @product.update(product_params)
      flash.notice = I18n.t('web.product.actions.update.success')
      redirect_to products_path
    else
      flash.alert = I18n.t('web.product.actions.update.fail')
      render 'new'
    end
  end

  def destroy
    if @product.destroy
      flash.notice = I18n.t('web.product.actions.destroy.success')
    else
      flash.alert = I18n.t('web.product.actions.destroy.fail')
    end
    redirect_to products_path
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params
      .require(:product)
      .permit(
        :name,
        :price_in_diamonds,
        :image,
        :short_description,
        :description
      )
      .merge(user_id: current_user.id)
  end
end
