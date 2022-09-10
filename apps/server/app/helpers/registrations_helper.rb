module RegistrationsHelper
  def plan_title(plan)
    key = plan || User::DEFAULT_PLAN

    I18n.t("web.user.plan.#{key}.title")
  end
end
