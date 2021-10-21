require 'rails_helper'

RSpec.describe RegistrationsHelper, type: :helper do
  describe "#plan_title" do
    subject { helper.plan_title(plan) }

    User.plans.keys.each do |plan|
      context "when plan is #{plan}" do
        let(:plan) { plan }

        it { is_expected.to eq(I18n.t("web.user.plan.#{plan}.title", raise: true)) }
      end
    end

    context 'when plan is nil' do
      let(:plan) { nil }

      it { is_expected.to eq(I18n.t("web.user.plan.trial.title")) }
    end
  end
end
