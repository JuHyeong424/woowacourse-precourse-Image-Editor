pub fn saturation(data: &mut [u8], value: f32) {
    let factor = value;

    for i in (0..data.len()).step_by(4) {
        let r = data[i] as f32;
        let g = data[i + 1] as f32;
        let b = data[i + 2] as f32;

        let gray = 0.3 * r + 0.59 * g + 0.11 * b;

        let new_r = gray + (r - gray) * factor;
        let new_g = gray + (g - gray) * factor;
        let new_b = gray + (b - gray) * factor;

        data[i] = new_r.min(255.0).max(0.0) as u8;
        data[i + 1] = new_g.min(255.0).max(0.0) as u8;
        data[i + 2] = new_b.min(255.0).max(0.0) as u8;
    }
}
