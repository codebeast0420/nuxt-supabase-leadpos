import * as ROUTES from '~/constants/routes'

export const useSidebarMenu = () => {
    const SvgoCogWheel = resolveComponent('svgo-cog-wheel')
    const SvgoLeadForm = resolveComponent('svgo-lead-form')
    const SvgoLeads = resolveComponent('svgo-leads')

    return [
    {
        id: 1,
        route: ROUTES.CAMPAIGNS_OVERVIEW,
        icon: SvgoCogWheel,
        name: 'sidebar.menu.campaigns',
        current: false
    },
    {
        id: 2,
        route: ROUTES.LEAD_FORMS_OVERVIEW,
        icon: SvgoLeadForm,
        name: 'sidebar.menu.lead_forms',
        current: false
    },
    {
        id: 3,
        route: ROUTES.LEADS_OVERVIEW,
        icon: SvgoLeads,
        name: 'sidebar.menu.leads',
        current: false
    },
]

}
