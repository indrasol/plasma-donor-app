export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        title: '$28k',
        subtitle: 'Donors'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-brightness-high',
        title: '$3k',
        subtitle: 'Influencers'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-book-half',
        title: '1456',
        subtitle: 'New Donors'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-box-fill',
        title: '28',
        subtitle: 'Influencers'
    },

] 