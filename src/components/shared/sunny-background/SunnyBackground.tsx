/* Fondo */
export function SunnyBackground() {
    return (
        <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
                backgroundImage: "radial-gradient(circle at center, #fde047, transparent)",
            }}
        />
    );
}