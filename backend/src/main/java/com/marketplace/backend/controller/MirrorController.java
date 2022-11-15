package com.marketplace.backend.controller;

import com.marketplace.backend.entity.Mirror;
import com.marketplace.backend.service.MirrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MirrorController {
    @Autowired
    private MirrorService mirrorService;

    @GetMapping("/mirrors")
    public List<Mirror> showAllEmployees() {
        List<Mirror> allMirrors = mirrorService.getAllMirrors();
        return allMirrors;
    }

    @GetMapping("/mirrors/{id}")
    public Mirror getMirror(@PathVariable long id) {
        Mirror mirror = mirrorService.getMirror(id);
        return mirror;
    }

    @PostMapping("/mirrors")
    public Mirror addNewMirror(@RequestBody Mirror mirror) {
        mirrorService.saveMirror(mirror);
        return mirror;
    }

    @PutMapping("/mirrors")
    public Mirror updateMirror(@RequestBody Mirror mirror) {
        mirrorService.saveMirror(mirror);
        return mirror;
    }

    @DeleteMapping("/mirrors/{id}")
    public String deleteMirror(@PathVariable long id) {
        mirrorService.deleteMirror(id);
        return "Mirror with ID = " + id + " was deleted";
    }
}
