pub fn hue(data: &mut [u8], degrees: f32) {
    let shift = degrees.to_radians();

    for i in (0..data.len()).step_by(4) {
        let r = data[i] as f32 / 255.0;
        let g = data[i + 1] as f32 / 255.0;
        let b = data[i + 2] as f32 / 255.0;

        let (mut h, s, l) = rgb_to_hsl(r, g, b);

        h += shift / (2.0 * std::f32::consts::PI);
        if h < 0.0 { h += 1.0; }
        if h > 1.0 { h -= 1.0; }

        let (nr, ng, nb) = hsl_to_rgb(h, s, l);

        data[i] = (nr * 255.0).round().clamp(0.0, 255.0) as u8;
        data[i + 1] = (ng * 255.0).round().clamp(0.0, 255.0) as u8;
        data[i + 2] = (nb * 255.0).round().clamp(0.0, 255.0) as u8;
    }
}

fn rgb_to_hsl(r: f32, g: f32, b: f32) -> (f32, f32, f32) {
    let max = r.max(g.max(b));
    let min = r.min(g.min(b));
    let l = (max + min) / 2.0;

    if (max - min).abs() < 1e-6 {
        return (0.0, 0.0, l);
    }

    let d = max - min;
    let s = if l > 0.5 { d / (2.0 - max - min) } else { d / (max + min) };

    let mut h = if (max - r).abs() < 1e-6 {
        (g - b) / d + if g < b { 6.0 } else { 0.0 }
    } else if (max - g).abs() < 1e-6 {
        (b - r) / d + 2.0
    } else {
        (r - g) / d + 4.0
    };

    h /= 6.0;
    (h, s, l)
}

fn hue_to_rgb(p: f32, q: f32, mut t: f32) -> f32 {
    if t < 0.0 { t += 1.0; }
    if t > 1.0 { t -= 1.0; }
    if t < 1.0 / 6.0 { return p + (q - p) * 6.0 * t; }
    if t < 1.0 / 2.0 { return q; }
    if t < 2.0 / 3.0 { return p + (q - p) * (2.0 / 3.0 - t) * 6.0; }
    p
}

fn hsl_to_rgb(h: f32, s: f32, l: f32) -> (f32, f32, f32) {
    if s <= 0.0 {
        return (l, l, l);
    }

    let q = if l < 0.5 { l * (1.0 + s) } else { l + s - l * s };
    let p = 2.0 * l - q;

    let r = hue_to_rgb(p, q, h + 1.0 / 3.0);
    let g = hue_to_rgb(p, q, h);
    let b = hue_to_rgb(p, q, h - 1.0 / 3.0);

    (r, g, b)
}
