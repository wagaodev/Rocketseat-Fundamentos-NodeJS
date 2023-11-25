import { Readable, Transform, Writable } from "stream";

class OneToHundred extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class TransformNegative extends Transform {
  _transform(chunk, encoded, callback) {
    const transform = Number(chunk.toString() * -1);
    callback(null, Buffer.from(String(transform)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoded, callback) {
    console.log(Number(chunk.toString()) * 10);

    callback();
  }
}

new OneToHundred()
  .pipe(new TransformNegative())
  .pipe(new MultiplyByTenStream());
