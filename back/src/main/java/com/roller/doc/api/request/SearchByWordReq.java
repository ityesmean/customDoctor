package com.roller.doc.api.request;

import lombok.Data;

@Data
public class SearchByWordReq {
    private double x;
    private double y;

    SearchByWordReq(double x, double y) {
        this.x = x;
        this.y = y;
    }
}
