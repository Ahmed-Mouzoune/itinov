type TStrapiErrorsApiResponse = {
    data: null;
    error: IStrapiErrorsProps
}

interface IStrapiErrorsProps {
    status: number | null;
    name: string | null;
    message: string | null;
    details: any
}
