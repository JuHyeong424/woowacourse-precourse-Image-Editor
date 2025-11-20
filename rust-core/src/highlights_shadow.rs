pub fn highlights_shadows(data: &mut [u8], shadows: f32, highlights: f32) {
    let shadows = (shadows / 100.0).clamp(-1.0, 1.0);
    let highlights = (highlights / 100.0).clamp(-1.0, 1.0);

    for i in (0..data.len()).step_by(4) {
        let r = data[i] as f32 / 255.0;
        let g = data[i + 1] as f32 / 255.0;
        let b = data[i + 2] as f32 / 255.0;

        let l = 0.3 * r + 0.59 * g + 0.11 * b;

        let mut factor = 1.0;

        if l < 0.5 {
            factor += shadows * (0.5 - l) * 2.0;
        }

        if l > 0.5 {
            factor -= highlights * (l - 0.5) * 2.0;
        }

        let nr = (r * factor).clamp(0.0, 1.0);
        let ng = (g * factor).clamp(0.0, 1.0);
        let nb = (b * factor).clamp(0.0, 1.0);

        data[i] = (nr * 255.0) as u8;
        data[i + 1] = (ng * 255.0) as u8;
        data[i + 2] = (nb * 255.0) as u8;
    }
}
