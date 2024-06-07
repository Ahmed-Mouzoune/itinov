export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    };
    const formattedDate = date.toLocaleDateString('fr-FR', options);

    return formattedDate;
}
