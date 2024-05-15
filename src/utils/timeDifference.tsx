
export const getTimeDifference = (timestamp: any) => {
    const now: any = new Date();
    const diff = Math.round((now - timestamp) / 1000);

    if (diff < 60) {
        return `${diff} sec ago`;
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} min ago`;
    } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} hour ago`;
    } else {
        return `${Math.floor(diff / 86400)} days ago`;
    }
}
