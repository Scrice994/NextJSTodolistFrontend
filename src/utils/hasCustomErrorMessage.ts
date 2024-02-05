export function hasCustomErrorMessage(err: unknown): err is { data: { error: string } }{
    return Boolean(
        err && typeof err === "object" && "data" in err &&
        err.data && typeof err.data === "object" && "error" in err.data &&
        err.data.error && typeof err.data.error === "string"
    )
}