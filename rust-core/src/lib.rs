use wasm_bindgen::prelude::*;

mod brightness;
mod grayscale;
mod contrast;

#[wasm_bindgen]
pub fn grayscale(data: &mut [u8]) {
    grayscale::grayscale(data)
}

#[wasm_bindgen]
pub fn brightness(data: &mut [u8]) {
    brightness::brightness(data)
}

pub use contrast::contrast;
