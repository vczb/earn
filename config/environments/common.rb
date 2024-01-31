Rails.application.configure do
    # configure subdomain
    config.hosts << ".gamou"

    config.action_dispatch.tld_length = 0

    config.action_controller.relative_url_root
end
