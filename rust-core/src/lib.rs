use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grayscale(data: &mut [u8]) {
    for i in (0..data.len()).step_by(4) {
        let avg = ((data[i] as u32 + data[i + 1] as u32 + data[i + 2] as u32) / 3) as u8;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
}
