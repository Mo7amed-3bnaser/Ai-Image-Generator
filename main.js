const inp = document.getElementById("inp");
const images = document.querySelector(".images");
const btn = document.querySelector("button");

const getImages = async () => {
    try {
        // إنشاء عنصر div واحد للصورة
        images.innerHTML = '';
        const div = document.createElement("div");
        div.innerHTML = "جاري التحميل...";
        images.appendChild(div);

        const prompt = inp.value;
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("خطأ أثناء جلب الصورة");
            }
            
            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            
            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = prompt;
            
            div.innerHTML = '';
            div.appendChild(img);
        } catch (error) {
            div.innerHTML = 'فشل تحميل الصورة';
            console.error("حدث خطأ:", error);
        }

    } catch (error) {
        alert("حدث خطأ: " + error.message);
        images.innerHTML = '';
    }
}

// إضافة حدث النقر على الزر
btn.addEventListener("click", getImages);
